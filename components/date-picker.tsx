import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

function DatePicker({ date, setDate }) {
  const [show, setShow] = useState(false);

  return (
    <View>
      <Text className="text-">Date</Text>
      <Pressable
        onPress={() => {
          setShow(!show);
        }}
        className="rounded-lg p-4 px-2 bg-white"
      >
        <Text>{date.toDateString()}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display="default"
          onChange={(event: DateTimePickerEvent, date: Date) => {
            const {
              type,
              nativeEvent: { timestamp },
            } = event;

            if (type === "set") {
              setDate(date);
              setShow(false);
            }

            if (type === "dismissed") {
              setShow(false);
            }
          }}
        />
      )}
    </View>
  );
}

export default DatePicker;
