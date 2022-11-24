import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CalendarContent from "./CalendarContent";

const MainCalendar = () => {
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const getDetail = (date) => {
    const day = format(date, "yyyy-MM-dd");
    const res = axios.get("http://localhost:5000/api/today/");
    console.log(res);
    return res;
  };
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [todos, setTodos] = useState([
    {
      totalTime: 0,
      exercise: [
        {
          exerciseId: 1,
          exerciseName: "벤치프레스",
          isComleted: true,
        },
        {
          exerciseId: 2,
          exerciseName: "스쿼트",
          isComleted: false,
        },
        {
          exerciseId: 3,
          exerciseName: "데드리프트",
          isComleted: false,
        },
      ],
    },
  ]);
  const [boolean, setBoolean] = useState(false);
  const [meetings, setMeetings] = useState([
    {
      success: true,
      data: [
        {
          dueDate: "2022-11-20",
          todayId: 1,
          completed: 1,
        },
        {
          dueDate: "2022-11-22",
          todayId: 2,
          completed: 0,
        },
      ],
    },
  ]);
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // const selectedDayMeetings = meetings[0].data.filter((meeting) =>
  //   isSameDay(parseISO(meeting.dueDate), selectedDay)
  // );

  const getApi = async () => {
    // 달력 월 바뀔때 api 호출
    const month = dayjs(currentMonth).format("YYYY-MM");
    await axios
      .get(`http://localhost:5000/exercises/calendar?date=${month}`)
      .then((res) => {
        // setMeetings(res.data);
      });
  };

  const onDateClick = async (day) => {
    const selectDay = dayjs(day).format("YYYY-MM-DD");
    const todayId = meetings[0].data.find(
      (item) => item.dueDate === selectDay
    )?.todayId;

    if (todayId) {
      setBoolean(true);

      // await axios
      //   .get(`http://localhost:5000/exercises/calendar/detail/${todayId}`)
      //   .then((res) => {
      //     setTodos(res.data);
      //   });
    } else {
      setBoolean(false);
    }
  };

  useEffect(() => {
    getApi();
  }, [currentMonth]);

  return (
    <div className="mt-9 min-w-[20em] max-w-[20em]">
      <div className=" px-4 mx-auto ">
        <div>
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-white">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-100 ease-out duration-150 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-100 ease-out duration-150 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-400">
            <div>일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
          </div>
          <div className="grid grid-cols-7 mt-3 text-sm ">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-1.5"
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDay(day);
                    onDateClick(day);
                  }}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-d-dark",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-white",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "bg-d-button text-red-600 pt-[0.1em]",
                    isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      "bg-d-button pb-[0.13em] ",
                    !isEqual(day, selectedDay),
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-xl pb-[0.1em] ease-out duration-150 "
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>

                <div className="w-1 h-1 mx-auto mt-1">
                  {meetings[0].data.some((meeting) =>
                    isSameDay(parseISO(meeting.dueDate), day)
                  ) && <div className="w-1 h-1 rounded-full bg-sky-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-4 px-12">
          <h2 className="font-semibold text-white">
            이날의 운동{" "}
            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
              {format(selectedDay, "MMM dd, yyy")}
            </time>
          </h2>
          <ol className="mt-4 text-sm leading-6 text-gray-500">
            {boolean ? (
              <CalendarContent todos={todos} />
            ) : (
              <p className="whitespace-nowrap">
                해당 날짜에는 운동을 진행하지 않았습니다.
              </p>
            )}
          </ol>
        </section>
      </div>
    </div>
  );
};

export default MainCalendar;
