import { Alert } from "react-native";

const warningAlert = (title: string, text: string) => Alert.alert(title, text);

const confirmAlert = (
  title: string,
  text: string,
  param: any,
  method: (param: any) => void
) =>
  Alert.alert(title, text, [
    {
      text: "Não",
      onPress: () => console.log("Cancel Pressed"),
    },
    { text: "Sim", onPress: () => method(param) },
  ]);

export { warningAlert, confirmAlert };
