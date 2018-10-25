import { OnChanges, ElementRef, SimpleChanges } from '@angular/core';
export declare class nvD3 implements OnChanges {
    private elementRef;
    options: any;
    data: any;
    private el;
    private chart;
    private svg;
    constructor(elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    updateWithOptions(options: any): void;
    update(): void;
    updateWithData(data: any): void;
    configure(chart: any, options: any, chartType: any): void;
    static configureEvents(dispatch: any, options: any): void;
    clearElement(): void;
}
export declare class NvD3Module {
}
