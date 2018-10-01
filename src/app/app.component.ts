import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  /**
   * reference to the dynamic component
   */
  @ViewChild('microFormInput')
  public microFormInput: Element;

  /**
   * Url to use for retrieving the Json Web Key
   */
  private jwkUrl = 'https://dev.iag-bsa.com/billing/v2/jwk';

  /**
   * Location the flex microform library
   */
  private microformUrl = 'https://testflex.cybersource.com/cybersource/assets/microform/0.3.0/flex-microform.min.js';

  /**
   * The script element which gets added to the header
   */
  private cyberSourceScriptElm: any;

  ngOnInit() {
    this.loadJsFile();
  }

  /**
   * Inject microform library into the dom
   */
  private loadJsFile(): void {

    const headElm = document.getElementsByTagName('head')[0];
    this.cyberSourceScriptElm = document.createElement('script');
    this.cyberSourceScriptElm.type = 'text/javascript';
    this.cyberSourceScriptElm.src = this.microformUrl;
    this.cyberSourceScriptElm.onload = () => {
      const jwk = this.getCyberSourceJWK();
      this.initMicroForm(jwk);
    };
    this.cyberSourceScriptElm.onerror = () => {
      console.log('Error Cybersource script');
    };
    headElm.appendChild(this.cyberSourceScriptElm);
  }

  /**
   * Calls the ground service to get the JWK and sets up the microform
   */
  private getCyberSourceJWK(): any {
    const xmlHttp = new XMLHttpRequest();
    // Make non-asynchronous call to retrieve JWK
    xmlHttp.open('GET', this.jwkUrl, false);
    xmlHttp.send();
    return JSON.parse(xmlHttp.responseText);
  }

  /**
   * Initialises the flex microform
   *
   * @param {string} jwk
   */
  private initMicroForm(jwk: any) {

    if (this.microFormInput['nativeElement'].childElementCount > 0) {
      this.microFormInput['nativeElement'].removeChild(this.microFormInput['nativeElement'].firstElementChild);
    }

    const formInitObject: any = {
      keyId: jwk.kid,
      keystore: jwk,
      container: '#cardNumber-container',
      label: '#cardNumber-label',
      placeholder: 'Card Number',
      encryptionType: 'rsaoaep',
      styles: {}
    };

    try {
      FLEX.microform(formInitObject, (setupError, microformInstance) => {
        if (setupError) {
          console.error('MicroForm Setup Error:', setupError);
          return;
        }

      });
    } catch (e) {
      console.error('MicroForm Error:', e);
    }
  }

}
