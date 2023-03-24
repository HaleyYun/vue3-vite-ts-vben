import moment from "dayjs"
export enum rulesDateEnum {
    Today = '今',
    Yesterday = '昨',
    SevenDay = '近7日',
    ThirdDay = '近30日',
}
export const transDate = (des) => {
    if (des === rulesDateEnum.Today) {
        return moment().format('YYYY-MM-DD')
    } else if (des === rulesDateEnum.Yesterday) {
        return moment().subtract('1', 'd').format('YYYY-MM-DD')
    } else if (des === rulesDateEnum.SevenDay) {
        return moment().subtract('7', 'd').format('YYYY-MM-DD')
    } else {
        return moment().subtract('30', 'd').format('YYYY-MM-DD')
    }
}
