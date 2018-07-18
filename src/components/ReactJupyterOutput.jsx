import React from "react";
import {joinText, ansi} from "../util";
import * as marked from "marked";

class ReactJupyterOutput extends React.Component {

    displayPriority = [
        "png", "image/png", "jpeg", "image/jpeg",
        "svg", "image/svg+xml", "text/svg+xml", "html", "text/html",
        "text/markdown", "latex", "text/latex",
        "javascript", "application/javascript",
        "text", "text/plain"
    ];


    mimeTypeRenderers = {
        'text/plain': this.renderText,
        'text/html': this.renderHtml,
        'text/markdown': this.renderMarkdown,
        'text/svg+xml': this.renderSvg,
        'image/svg+xml': this.renderSvg
    };

    // @TODO we can break these into individual components.
    renderers = {
        'display_data': this.renderData,
        'execute_result': this.renderData,
        'pyout': this.renderData,
        // @TODO 'pyerr': render_error,
        // @TODO 'error': render_error,
        'stream': this.renderStream
    }

    renderText(text) {
        return <pre className={"text-output"}>
                {`${joinText(text)}`}
            </pre>

    }

    renderHtml(html) {
        return <div className={"html-output"}>
            {joinText(html)}
        </div>
    }

    renderMarkdown(md) {
        this.renderHtml(marked(joinText(md)))
    }

    renderSvg(svg) {
        return <div className={"svg-output"}>
            {joinText(svg)}
        </div>
    }


    renderData() {
        let {raw} = this.props;

        let format = this.displayPriority.filter(function (d) {
            return raw.data ? raw.data[d] : raw[d];
        })[0];

        if (format) {
            if (this.mimeTypeRenderers[format]) {
                return this.mimeTypeRenderers[format](raw[format] || raw.data[format]);
            }
        }
        return <div className={"rj-output-empty"}/>
    };

    renderStream() {
        let {raw} = this.props;
        return (
            <pre>
                {`${ansi.ansi_to_html(raw)}`}
            </pre>
        )
    }

    render() {
        let {cell, raw} = this.props;
        let type = raw.output_type; // @Todo..
        return (
            <div className={"rj-output"} data-prompt-number={cell.number}>
                {this.renderers[type]()}
            </div>
        )
    }

}