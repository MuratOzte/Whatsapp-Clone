export const hasher = (sender: string, receier: string) => {
    const unhashed = sender + receier;
    let sum = 0;
    for (let i = 0; i < unhashed.length; i++) {
        sum += unhashed.charCodeAt(i);
    }
    console.log('sum:', sum, 'sender:', sender, 'receiver:', receier);

    return sum;
};
