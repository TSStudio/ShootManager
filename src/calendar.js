export class CalendarEvent {
    DTSTART = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d\d\dZ/, "Z");
    DTEND = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d\d\dZ/, "Z");
    DTSTAMP = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d\d\dZ/, "Z");
    start = new Date();
    end = new Date();
    /**
     * @param {string} summary 拍摄计划名称
     * @param {Date} start 开始时间
     * @param {Date} end 结束时间
     * @param {string} location 地点
     * @param {string} description 描述
     */
    constructor(summary, start, end, location, description) {
        this.summary = summary;
        this.DTSTART = start
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d\d\dZ/, "Z");
        this.DTEND = end
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d\d\dZ/, "Z");
        this.start = start;
        this.end = end;
        this.location = location;
        this.description = description;
    }
    dateToString() {
        let date = this.start;
        return `${date.getFullYear()}-${
            date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1).toString()
                : (date.getMonth() + 1).toString()
        }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    }
    dateStartEndToString(dateStart, dateEnd) {
        if (
            dateStart.getFullYear() === dateEnd.getFullYear() &&
            dateStart.getMonth() === dateEnd.getMonth() &&
            dateStart.getDate() === dateEnd.getDate()
        ) {
            if (dateEnd.getTime() - dateStart.getTime() > 1000 * 60 * 60 * 23) {
                //all day event
                `${dateStart.getFullYear()}-${
                    dateStart.getMonth() + 1
                }-${dateStart.getDate()}`;
            }
            return `${dateStart.getFullYear()}-${
                dateStart.getMonth() + 1
            }-${dateStart.getDate()} ${dateStart.getHours()}:${
                dateStart.getMinutes() < 10
                    ? "0" + dateStart.getMinutes()
                    : dateStart.getMinutes()
            }-${dateEnd.getHours()}:${
                dateEnd.getMinutes() < 10
                    ? "0" + dateEnd.getMinutes()
                    : dateEnd.getMinutes()
            }`;
        } else {
            return `${dateStart.getFullYear()}-${
                dateStart.getMonth() + 1
            }-${dateStart.getDate()} ${dateStart.getHours()}:${
                dateStart.getMinutes() < 10
                    ? "0" + dateStart.getMinutes()
                    : dateStart.getMinutes()
            }-${dateEnd.getFullYear()}-${
                dateEnd.getMonth() + 1
            }-${dateEnd.getDate()} ${dateEnd.getHours()}:${
                dateEnd.getMinutes() < 10
                    ? "0" + dateEnd.getMinutes()
                    : dateEnd.getMinutes()
            }`;
        }
    }
    /**
     * @returns {string} 日历ICS Vevent
     * @description 从日历事件转换为日历ICS Vevent
     */
    generateVEVENT() {
        return `BEGIN:VEVENT
DTSTART:${this.DTSTART}
DTEND:${this.DTEND}
DTSTAMP:${this.DTSTAMP}
SUMMARY:${this.summary}
LOCATION:${this.location}
DESCRIPTION:${this.description}
END:VEVENT\n`;
    }
    generateCard() {
        let card = document.createElement("div");
        card.classList.add("card");
        if (this.end.getTime() < new Date().getTime()) {
            card.classList.add("card-color-gray");
        } else if (this.start.getTime() < new Date().getTime()) {
            card.classList.add("card-color-orange");
        } else {
            card.classList.add("card-color-blue");
        }
        let cardSummary = document.createElement("span");
        cardSummary.classList.add("card-summary");
        cardSummary.innerText = this.summary;
        card.appendChild(cardSummary);
        card.appendChild(document.createElement("br"));
        let cardTime = document.createElement("span");
        cardTime.classList.add("card-time");
        cardTime.innerText = this.dateStartEndToString(this.start, this.end);
        card.appendChild(cardTime);
        card.appendChild(document.createElement("br"));
        let cardLocation = document.createElement("span");
        cardLocation.classList.add("card-location");
        cardLocation.innerText = this.location;
        card.appendChild(cardLocation);
        return card;
    }
}
