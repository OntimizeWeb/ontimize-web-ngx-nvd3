import { NgModule, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as nv from 'nvd3';
import '../../custom_models/gaugeChart';
import '../../custom_models/gauge';
import '../../custom_models/packedBubbleChart';
import '../../custom_models/packedBubble';
import '../../custom_models/radarChart';
import '../../custom_models/radar';
var nvD3 = (function () {
    function nvD3(elementRef) {
        this.elementRef = elementRef;
        this.el = elementRef.nativeElement;
    }
    nvD3.prototype.ngOnChanges = function (changes) {
        var self = this;
        this.updateWithOptions(this.options);
    };
    nvD3.prototype.updateWithOptions = function (options) {
        var self = this;
        this.clearElement();
        if (!options)
            return;
        this.chart = nv.models[options.chart.type]();
        this.chart.id = Math.random().toString(36).substr(2, 15);
        for (var key in this.chart) {
            if (!this.chart.hasOwnProperty(key))
                continue;
            var value = this.chart[key];
            if (key[0] === '_') {
            }
            else if ([
                'clearHighlights',
                'highlightPoint',
                'id',
                'options',
                'resizeHandler',
                'state',
                'open',
                'close',
                'tooltipContent'
            ].indexOf(key) >= 0) {
            }
            else if (key === 'dispatch')
                nvD3.configureEvents(this.chart[key], options.chart[key]);
            else if ([
                'bars',
                'bars1',
                'bars2',
                'boxplot',
                'bullet',
                'controls',
                'discretebar',
                'distX',
                'distY',
                'interactiveLayer',
                'legend',
                'lines',
                'lines1',
                'lines2',
                'multibar',
                'pie',
                'scatter',
                'scatters1',
                'scatters2',
                'sparkline',
                'stack1',
                'stack2',
                'sunburst',
                'tooltip',
                'x2Axis',
                'xAxis',
                'y1Axis',
                'y2Axis',
                'y3Axis',
                'y4Axis',
                'yAxis',
                'yAxis1',
                'yAxis2'
            ].indexOf(key) >= 0 ||
                (key === 'stacked' && options.chart.type === 'stackedAreaChart')) {
                this.configure(this.chart[key], options.chart[key], options.chart.type);
            }
            else if ((key === 'xTickFormat' || key === 'yTickFormat') && options.chart.type === 'lineWithFocusChart') {
            }
            else if ((key === 'tooltips') && options.chart.type === 'boxPlotChart') {
            }
            else if ((key === 'tooltipXContent' || key === 'tooltipYContent') && options.chart.type === 'scatterChart') {
            }
            else if (options.chart[key] === undefined || options.chart[key] === null) {
            }
            else
                this.chart[key](options.chart[key]);
        }
        this.updateWithData(this.data);
        nv.addGraph({
            generate: function () {
                if (!self.chart)
                    return;
                if (self.chart.resizeHandler)
                    self.chart.resizeHandler.clear();
                return self.chart;
            },
            callback: function (graph) {
                nv.utils.windowResize(function () {
                    self.update();
                });
                self.update();
                options.chart['callback'] && options.chart['callback']();
            }
        });
    };
    nvD3.prototype.update = function () {
        var self = this;
        self.chart && self.chart.update && self.chart.update();
    };
    nvD3.prototype.updateWithData = function (data) {
        if (data) {
            d3.select(this.el).select('svg').remove();
            var h = void 0, w = void 0;
            this.svg = d3.select(this.el).append('svg');
            if (h = this.options.chart.height) {
                if (!isNaN(+h))
                    h += 'px';
                this.svg.attr('height', h).style({ height: h });
            }
            if (w = this.options.chart.width) {
                if (!isNaN(+w))
                    w += 'px';
                this.svg.attr('width', w).style({ width: w });
            }
            else {
                this.svg.attr('width', '100%').style({ width: '100%' });
            }
            this.svg.datum(data).call(this.chart);
        }
    };
    nvD3.prototype.configure = function (chart, options, chartType) {
        if (chart && options) {
            for (var key in chart) {
                if (!chart.hasOwnProperty(key))
                    continue;
                var value = chart[key];
                if (key[0] === '_') {
                }
                else if (key === 'dispatch')
                    nvD3.configureEvents(value, options[key]);
                else if (key === 'tooltip')
                    this.configure(chart[key], options[key], chartType);
                else if (key === 'contentGenerator') {
                    if (options[key])
                        chart[key](options[key]);
                }
                else if ([
                    'axis',
                    'clearHighlights',
                    'defined',
                    'highlightPoint',
                    'nvPointerEventsClass',
                    'options',
                    'rangeBand',
                    'rangeBands',
                    'scatter',
                    'open',
                    'close'
                ].indexOf(key) === -1) {
                    if (options[key] === undefined || options[key] === null) {
                    }
                    else
                        chart[key](options[key]);
                }
            }
        }
    };
    nvD3.configureEvents = function (dispatch, options) {
        if (dispatch && options) {
            for (var key in dispatch) {
                if (!dispatch.hasOwnProperty(key))
                    continue;
                var value = dispatch[key];
                if (options[key] === undefined || options[key] === null) {
                }
                else
                    dispatch.on(key + '._', options[key]);
            }
        }
    };
    nvD3.prototype.clearElement = function () {
        this.el.innerHTML = '';
        if (this.chart && this.chart.tooltip && this.chart.tooltip.id) {
            d3.select('#' + this.chart.tooltip.id()).remove();
        }
        if (nv['graphs'] && this.chart) {
            for (var i = nv['graphs'].length - 1; i >= 0; i--) {
                if (nv['graphs'][i] && (nv['graphs'][i].id === this.chart.id)) {
                    nv['graphs'].splice(i, 1);
                }
            }
        }
        if (nv.tooltip && nv.tooltip.cleanup) {
            nv.tooltip.cleanup();
        }
        if (this.chart && this.chart.resizeHandler)
            this.chart.resizeHandler.clear();
        this.chart = null;
    };
    nvD3.decorators = [
        { type: Component, args: [{
                    selector: 'nvd3',
                    template: "",
                    encapsulation: ViewEncapsulation.None,
                    styles: [
                        "\n          nvd3 {\n            display: block;\n            width: 100%;\n          }\n        "
                    ],
                    exportAs: 'nvd3'
                },] },
    ];
    nvD3.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    nvD3.propDecorators = {
        "options": [{ type: Input },],
        "data": [{ type: Input },],
    };
    return nvD3;
}());
export { nvD3 };
var NvD3Module = (function () {
    function NvD3Module() {
    }
    NvD3Module.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        nvD3
                    ],
                    imports: [],
                    exports: [
                        nvD3
                    ],
                },] },
    ];
    return NvD3Module;
}());
export { NvD3Module };
