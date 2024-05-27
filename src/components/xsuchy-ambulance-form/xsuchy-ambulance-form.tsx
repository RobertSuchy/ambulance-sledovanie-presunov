import { Component, Host, h, Prop, State, EventEmitter, Event } from '@stencil/core';
import { Transport, MobilityStatus, DepartmentTransportsListApiFactory, DepartmentListApiFactory, MobilityStatusListApiFactory } from '../../api/xsuchy-ambulance';

@Component({
  tag: 'xsuchy-ambulance-form',
  styleUrl: 'xsuchy-ambulance-form.css',
  shadow: true,
})

export class XsuchyAmbulanceForm {
  @Prop() transportId: string;
  @Prop() departmentId: string;
  @Prop() apiBase: string;

  @Event({eventName: "form-closed"}) formClosed: EventEmitter<string>;

  @State() transport: Transport;
  @State() departmentList: any[];
  @State() mobilityStatusList: MobilityStatus[];
  @State() errorMessage:string;
  @State() isValid: boolean;

  private formElement: HTMLFormElement;

  private async getTransportAsync(): Promise<Transport> {
    if(this.transportId === "@new") {
      this.isValid = false;
      this.transport = {
        id: "@new",
        patientId: "",
        patientName: "",
        fromDepartmentId: "",
        toDepartmentId: "",
        scheduledDateTime: new Date().toISOString(),
        estimatedDurationMinutes: 0,
        mobilityStatus: { code: "", value: "", description: "" } as MobilityStatus
      };
      return this.transport;
    }
    if ( !this.transportId ) {
       this.isValid = false;
       return undefined
    }
    try {
       const response
           = await DepartmentTransportsListApiFactory(undefined, this.apiBase)
             .getTransport(this.transportId)

       if (response.status < 299) {
          this.transport = response.data;
          this.isValid = true;
       } else {
          this.errorMessage = `Cannot retrieve transport: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot retrieve transport: ${err.message || "unknown"}`
    }
    return undefined;
  }

  private async getDepartmentList(): Promise<any[]> {
    try {
      const response = await DepartmentListApiFactory(undefined, this.apiBase).getAllDepartments();
      if (response.status < 299) {
        this.departmentList = response.data;
      }
    } catch (err: any) { }
    return this.departmentList || [{
      id: "fallback",
      name: "No department",
      city: ""
    }];
  }

  private async getMobilityStatusList(): Promise<MobilityStatus[]> {
    try {
       const response = await MobilityStatusListApiFactory(undefined, this.apiBase).getMobilityStatusList();
       if (response.status < 299) {
       this.mobilityStatusList = response.data;
       }
    } catch (err: any) { }
    return this.mobilityStatusList || [{
       code: "fallback",
       value: "No mobility status",
       description: ""
    }];
  }

  async componentWillLoad() {
    await this.getTransportAsync();
    await this.getDepartmentList();
    await this.getMobilityStatusList();
  }

  render() {
    if(this.errorMessage) {
      return (
      <Host>
         <div class="error">{this.errorMessage}</div>
      </Host>
      )
    }

    return (
      <Host>
        <form ref={el => this.formElement = el}>        
          <md-filled-text-field label="Meno a priezvisko pacienta" 
            required value={this.transport?.patientName}
            oninput={ (ev: InputEvent) => {
               if(this.transport) {this.transport.patientName = this.handleInputEvent(ev)}
            } }>
            <md-icon slot="leading-icon">person</md-icon>
          </md-filled-text-field>

          <md-filled-text-field label="Rodné číslo pacienta" 
            required value={this.transport?.patientId}
            oninput={ (ev: InputEvent) => {
               if(this.transport) {this.transport.patientId = this.handleInputEvent(ev)}
            } }>          
            <md-icon slot="leading-icon">fingerprint</md-icon>
          </md-filled-text-field>

          {this.renderDepartmentSelect('fromDepartmentId', 'Oddelenie odkiaľ bude presun')}
          {this.renderDepartmentSelect('toDepartmentId', 'Oddelenie kam bude presun')}

          <md-filled-text-field label="Plánovaný termín presunu"
            type="datetime-local"
            value={this.transport?.scheduledDateTime ? new Date(this.transport.scheduledDateTime).toISOString().substring(0, 16) : ''}
            oninput={(ev: InputEvent) => {
              if (this.transport) { this.transport.scheduledDateTime = this.handleInputEvent(ev) }
            }}>
            <md-icon slot="leading-icon">event</md-icon>
          </md-filled-text-field>

          <md-filled-text-field
            label="Predpokladaný čas presunu (v minútach)"
            type="number"
            value={this.transport?.estimatedDurationMinutes ? this.transport.estimatedDurationMinutes.toString() : ''}
            oninput={(ev: InputEvent) => {
              if (this.transport) { this.transport.estimatedDurationMinutes = parseInt(this.handleInputEvent(ev), 10); }
            }}>
            <md-icon slot="leading-icon">hourglass_bottom</md-icon>
          </md-filled-text-field>

          {this.renderMobilityStatus()}
        </form>

        <md-divider></md-divider>
        <div class="actions">
          <md-filled-tonal-button id="delete" disabled={!this.transport || this.transport?.id === "@new" }
            onClick={() => this.deleteTransport()} 
            >
            <md-icon slot="icon">delete</md-icon>
            Zmazať
          </md-filled-tonal-button>
          <span class="stretch-fill"></span>
          <md-outlined-button id="cancel"
            onClick={() => this.formClosed.emit("cancel")}>
            Zrušiť
          </md-outlined-button>
          <md-filled-button id="confirm" disabled={ !this.isValid }
            onClick={() => this.updateTransport() }
            >
            <md-icon slot="icon">save</md-icon>
            Uložiť
          </md-filled-button>
        </div>
      </Host>
    );
  }

  private renderDepartmentSelect(field: 'fromDepartmentId' | 'toDepartmentId', label: string) {
    let departments = this.departmentList || [];
    return (
      <md-filled-select label={label}
        display-text={this.transport?.[field] ? `${this.getDepartmentName(this.transport[field])}` : ''}
        oninput={(ev: InputEvent) => this.handleDepartmentSelect(ev, field)}>
        <md-icon slot="leading-icon">domain</md-icon>
        {departments.map(department => {
          return (
            <md-select-option
              value={department.id}
              selected={department.id === this.transport?.[field]}>
              <div slot="headline">{`${department.name}, ${department.city}`}</div>
            </md-select-option>
          )
        })}
      </md-filled-select>
    );
  }
  
  private handleDepartmentSelect(ev: InputEvent, field: 'fromDepartmentId' | 'toDepartmentId') {
    if (this.transport) {
      this.transport[field] = this.handleInputEvent(ev);
    }
  }
  
  private getDepartmentName(departmentId: string): string {
    const department = this.departmentList.find(department => department.id === departmentId);
    return department ? `${department.name}, ${department.city}` : '';
  }
  
  private renderMobilityStatus() {
    let mobilityStatus = this.mobilityStatusList || [];
    if (this.transport?.mobilityStatus) {
      const index = mobilityStatus.findIndex(mobilityStatus => mobilityStatus.code === this.transport.mobilityStatus.code)
      if (index < 0) {
        mobilityStatus = [this.transport.mobilityStatus, ...mobilityStatus]
      }
    }
    return (
      <md-filled-select label="Mobilita pacienta"
        display-text={this.transport?.mobilityStatus?.value}
        oninput={(ev: InputEvent) => this.handleMobilityStatus(ev)} >
      <md-icon slot="leading-icon">accessible</md-icon>
      {this.transport?.mobilityStatus?.description ?
        <md-icon slot="trailing-icon" class="link"
          onclick={()=> window.open(this.transport.mobilityStatus.description, "_blank")}>
            open_in_new
        </md-icon>
      : undefined
      }
      {mobilityStatus.map(mobilityStatus => {
          return (
            <md-select-option
            value={mobilityStatus.code}
            selected={mobilityStatus.code === this.transport?.mobilityStatus?.code}>
                <div slot="headline">{mobilityStatus.value}</div>
            </md-select-option>
          )
      })}
      </md-filled-select>
    );
  }

  private handleMobilityStatus(ev: InputEvent) {
    if(this.transport) {
      const code = this.handleInputEvent(ev)
      const mobilityStatus = this.mobilityStatusList.find(mobilityStatus => mobilityStatus.code === code);
      this.transport.mobilityStatus = Object.assign({}, mobilityStatus);
    }
  }

  private handleInputEvent( ev: InputEvent): string {
    const target = ev.target as HTMLInputElement;
    this.isValid = true;
    for (let i = 0; i < this.formElement.children.length; i++) {
       const element = this.formElement.children[i]
       if ("reportValidity" in element) {
       const valid = (element as HTMLInputElement).reportValidity();
       console.log(valid)
       this.isValid &&= valid;
       }
    }
    return target.value
  }

  private async updateTransport() {
    try {
        const api = DepartmentTransportsListApiFactory(undefined, this.apiBase);
        const response
          = this.transportId === "@new"
          ? await api.createTransport(this.transport)
          : await api.updateTransport(this.transportId, this.transport);
        if (response.status < 299) {
          this.formClosed.emit("store")
        } else {
          this.errorMessage = `Cannot store transport: ${response.statusText}`
        }
      } catch (err: any) {
        this.errorMessage = `Cannot store transport: ${err.message || "unknown"}`
      }
  }

  private async deleteTransport() {
    try {
       const response = await DepartmentTransportsListApiFactory(undefined, this.apiBase)
          .deleteTransport(this.transportId)
       if (response.status < 299) {
       this.formClosed.emit("delete")
       } else {
       this.errorMessage = `Cannot delete transport: ${response.statusText}`
       }
    } catch (err: any) {
       this.errorMessage = `Cannot delete transport: ${err.message || "unknown"}`
    }
  }
}
