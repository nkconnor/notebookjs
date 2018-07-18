import React from 'react';

class ReactJupyterCell extends React.Component {
    constructor(props) {
        var cell = this;

        cell.raw = raw;
        cell.worksheet = worksheet;
        cell.type = raw.cell_type;
        if (cell.type === "code") {
            cell.number = raw.prompt_number > -1 ? raw.prompt_number : raw.execution_count;
            var source = raw.input || [ raw.source ];
            cell.input = new nb.Input(source, cell);
            var raw_outputs = (cell.raw.outputs || []).map(function (o) {
                return new nb.Output(o, cell);
            });
            cell.outputs = nb.coalesceStreams(raw_outputs);
        }
    }
}