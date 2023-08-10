import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaskitoElementPredicateAsync, MaskitoOptions, maskitoTransform } from '@maskito/core';
import maskitoOptions from './mask';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  a = '';
  b = '';

  readonly options = maskitoOptions;

  @ViewChild('cvv') input!: HTMLIonInputElement;
  ngAfterViewInit() {
    this.input.getInputElement().then((el) => {
      el.addEventListener('maskitoReject', () => {
        alert('Invalid Character');
      })
    })
  }

  readonly digitsOnlyMask: MaskitoOptions = {
    mask: /^\d+$/,
  };
  readonly timeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/],
  };

  readonly predicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();

  readonly numberMask: MaskitoOptions = {
    mask: /^\d+(,\d*)?$/,
    preprocessors: [
      ({ elementState, data }, actionType) => {
        const { value, selection } = elementState;

        return {
          elementState: {
            selection,
            value: value.replace('.', ','),
          },
          data: data.replace('.', ','),
        };
      },
    ]
  };

  readonly uppercaseMask: MaskitoOptions = {
    mask: /^[a-zA-Z\s]+$/,
    postprocessors: [
      ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
    ],
  };

  constructor() { }

  setValue() {
    this.a = maskitoTransform('abdcdkaldf12345', this.digitsOnlyMask);
  }

}
