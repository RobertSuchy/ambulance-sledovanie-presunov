import { Component, Host, h, State, Prop } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'xsuchy-ambulance',
  styleUrl: 'xsuchy-ambulance.css',
  shadow: true,
})

export class XsuchyAmbulance {
  @State() private relativePath = "";
  @Prop() basePath: string="";
  @Prop() apiBase: string;
  @Prop() departmentId: string;

  componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith( baseUri)) {
        this.relativePath = path.slice(baseUri.length)
      } else {
        this.relativePath = ""
      }
    }

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { (ev as any).intercept(); }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname)
  }

  render() {
    let element = "list"
    let transportId = "@new"
  
    if ( this.relativePath.startsWith("transport/"))
    {
      element = "form";
      transportId = this.relativePath.split("/")[1]
    }
  
    const navigate = (path:string) => {
      const absolute = new URL(path, new URL(this.basePath, document.baseURI)).pathname;
      window.navigation.navigate(absolute)
    }

    return (
      <Host>
        { element === "form"
        ? <xsuchy-ambulance-form transport-id={transportId}
            department-id={this.departmentId} api-base={this.apiBase}        
            oneditor-closed={ () => navigate("./list")} >
          </xsuchy-ambulance-form>
          : <xsuchy-ambulance-list  department-id={this.departmentId} api-base={this.apiBase}
            ontransport-clicked={ (ev: CustomEvent<string>)=> navigate("./transport/" + ev.detail) } >
          </xsuchy-ambulance-list>
        }
      </Host>
    );
  }

}
