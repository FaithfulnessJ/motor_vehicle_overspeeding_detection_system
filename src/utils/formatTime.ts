export const fomartTime  = (currentTime: number) => {
    const currentDate: Date = new Date(currentTime);

    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1;
    const day: number = currentDate.getDate();
    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();
    const seconds: number = currentDate.getSeconds();
  
    const formattedTime: string = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedTime;
}