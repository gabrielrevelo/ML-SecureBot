export function formatCommands(assistantResponse) {
    let assistantResponseArray = assistantResponse.split(" ");

    assistantResponseArray = assistantResponseArray.map(word => {
        return /^\/\w+/.test(word) ? "`" + word + "`" : word;
    });

    return assistantResponseArray.join(" ");
}