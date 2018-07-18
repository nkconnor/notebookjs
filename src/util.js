import AnsiUp from "ansi_up";

export function escapeHTML(raw) {
    var replaced = raw
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    return replaced;
}

export function joinText(text) {
    if (text.join) {
        return text.map(joinText).join("");
    } else {
        return text;
    }
}


export const ansi = AnsiUp.default;