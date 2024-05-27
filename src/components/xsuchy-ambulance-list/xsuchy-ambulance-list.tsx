import { Component, Host, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import { Transport, DepartmentTransportsListApiFactory } from '../../api/xsuchy-ambulance';

@Component({
  tag: 'xsuchy-ambulance-list',
  styleUrl: 'xsuchy-ambulance-list.css',
  shadow: true,
})
export class XsuchyAmbulanceList {
  @Event({ eventName: "transport-clicked" }) transportClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() departmentId: string;
  @State() errorMessage: string;

  transports: Transport[];

  private async getTransportsAsync(): Promise<Transport[]> {
    try {
      const response = await DepartmentTransportsListApiFactory(undefined, this.apiBase).getTransportsList(this.departmentId);
      if (response.status < 299) {
        return response.data;
      } else {
        this.errorMessage = `Cannot retrieve list of transports: ${response.statusText}`;
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of transports: ${err.message || "unknown"}`;
    }
    return [];
  }

  async componentWillLoad() {
    this.transports = await this.getTransportsAsync();
  }

  render() {
    return (
      <Host>
        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
          <md-list>
            {this.transports.map((transport) =>
              <md-list-item onClick={() => this.transportClicked.emit(transport.id)}>
                <div slot="headline">{transport.patientName}</div>
                <div slot="supporting-text">{"Predpokladaný čas presunu: " + this.isoDateToLocale(transport.scheduledDateTime)}</div>
                <md-icon slot="start">transfer_within_a_station</md-icon>
              </md-list-item>
            )}
          </md-list>
        }
        <md-filled-icon-button class="add-button"
          onclick={() => this.transportClicked.emit("@new")}>
          <md-icon>add</md-icon>
        </md-filled-icon-button>
      </Host>
    );
  }

  private isoDateToLocale(iso:string) {
    if(!iso) return '';
    return new Date(Date.parse(iso)).toLocaleDateString() + ", " + new Date(Date.parse(iso)).toLocaleTimeString()
  }
}
