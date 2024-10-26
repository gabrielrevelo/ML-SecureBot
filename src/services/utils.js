export function formatResponse(assistantResponse) {
    let formattedResponse = assistantResponse.replace(/\*\*(.*?)\*\*/g, '*$1*');

    let assistantResponseArray = formattedResponse.split(" ");

    assistantResponseArray = assistantResponseArray.map(word => {
        if (/^\/\w+/.test(word)) {
            return "`" + word + "`";
        } else {
            return word;
        }
    });

    return assistantResponseArray.join(" ");
}
