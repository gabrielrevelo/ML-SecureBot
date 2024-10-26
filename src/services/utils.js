export function formatResponse(assistantResponse) {
    let formattedResponse = assistantResponse.replace(/\*\*(.*?)\*\*/g, '*$1*');

    // Primero, reemplazamos "ML SecureBot" con la versión que incluye emojis
    formattedResponse = formattedResponse.replace(/ML SecureBot/g, 'ML SecureBot 🐧🛡️');

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
