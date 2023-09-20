<template>
    <el-header id="header">拍摄日程发布</el-header>
    <el-container
        id="main-container"
        v-loading="ContentLoadingStatus === 'loading'"
        ><el-result
            icon="error"
            title="加载失败"
            subTitle="请刷新，若仍错误则请复制错误信息并发送到 tss@mail.tmysam.top"
            id="error-container"
            v-if="ContentLoadingStatus == 'error'"
        >
        </el-result>
        <el-container v-show="ContentLoadingStatus == 'success'">
            <el-aside
                ><div class="section-title">以列表形式查看</div>
                <div id="cards" ref="cardcontainer"></div
            ></el-aside>
            <el-main
                ><div class="section-title">以日历形式查看</div>
                <el-calendar v-model="valueDate">
                    <template v-slot:dateCell="cl">
                        <div
                            :class="
                                calendarEventForDays[cl.data.day] == undefined
                                    ? 'calendar-day-no-event'
                                    : 'calendar-day-has-event'
                            "
                        >
                            {{ cl.data.day.split("-").slice(1).join("-")
                            }}<br />
                            {{
                                calendarEventForDays[cl.data.day] === undefined
                                    ? "-"
                                    : calendarEventForDays[cl.data.day]
                            }}
                        </div>
                    </template>
                </el-calendar></el-main
            >
        </el-container>
    </el-container>
</template>

<script>
import * as ce from "./calendar.js";
export default {
    data() {
        return {
            ContentLoadingStatus: "error",
            calendarDataRaw: [],
            calendarEvents: [],
            calendarEventForDays: {},
            valueDate: new Date(),
        };
    },
    components: {},
    methods: {
        handleSelect(key, keyPath) {
            this.comp = mappings[key];
        },
        parseCalendarData() {
            this.calendarDataRaw.forEach((element) => {
                let event = new ce.CalendarEvent(
                    element.eventSummary,
                    new Date(element.eventBegin * 1000),
                    new Date(element.eventEnd * 1000),
                    element.eventLocation,
                    ""
                );
                this.calendarEvents.push(event);
                if (
                    this.calendarEventForDays[event.dateToString()] ===
                    undefined
                )
                    this.calendarEventForDays[event.dateToString()] = "";
                this.calendarEventForDays[event.dateToString()] +=
                    element.eventSummary + "\n";
            });
            this.calendarEvents.forEach((element) => {
                let DOMelement = element.generateCard();
                this.$refs.cardcontainer.appendChild(DOMelement);
                DOMelement.addEventListener("click", () => {
                    this.valueDate = element.start;
                });
            });
        },
        loadSuccess() {
            this.parseCalendarData();
            this.ContentLoadingStatus = "success";
            ElMessage.success("加载成功");
        },
        loadError(error) {
            this.ContentLoadingStatus = "error";
            ElMessage.error("加载失败");
            ElMessageBox.alert("加载失败：" + error)
                .then(() => {})
                .catch(() => {});
        },
        loadCalendar() {
            let endpoint = "https://www.tmysam.top/apis/shootmanager/calendar";
            this.ContentLoadingStatus = "loading";
            fetch(endpoint)
                .then((response) => {
                    response
                        .json()
                        .then((data) => {
                            this.calendarDataRaw = data;
                            this.loadSuccess();
                        })
                        .catch((error) => {
                            this.loadError(
                                error.message + " when parsing " + endpoint
                            );
                            console.error(error);
                        });
                })
                .catch((error) => {
                    this.loadError(error.message + " when loading " + endpoint);
                });
        },
    },

    mounted() {
        this.loadCalendar();
    },
};
</script>
<script setup>
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
</script>
