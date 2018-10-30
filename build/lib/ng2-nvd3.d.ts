import { OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import '../../custom_models/gaugeChart';
import '../../custom_models/gauge';
import '../../custom_models/packedBubbleChart';
import '../../custom_models/packedBubble';
import '../../custom_models/radarChart';
import '../../custom_models/radar';
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
