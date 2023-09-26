import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/btn";

const RegistrationScreen = () => {

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/backgroundIMG.jpg")}
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
          >
            <View
              style={styles.wrapper}
            >
              <View style={styles.userAvatar}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ position: "absolute", top: 81, left: 107 }}
                >
                  <Image source={require("../assets/images/plus.png")} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.formWrapper}>
                <Input
                  placeholder="Логін"
                />
                <Input
                  placeholder="Адреса електронної пошти"
                />
                <View style={{ position: "relative" }}>
                  <Input
                    placeholder="Пароль"
                  />
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      position: "absolute",
                      right: 16,
                      top: 17,
                    }}
                  >
                    <Text
                      style={{
                        color: "#1B4371",
                        fontSize: 16,
                      }}
                    >
                    </Text>
                  </TouchableOpacity>
                </View>
                  <Button
                    text={"Зареєстуватися"}
                    styleProps={{ marginTop: 27 }}
                  />
              </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.noAccountMessage}>
                    Вже є акаунт?&nbsp;
                    <Text>Увійти</Text>
                  </Text>
                </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  userAvatar: {
    position: "absolute",
    top: -60,
    left: 128,
    zIndex: 100,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    position: "relative",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 45,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    marginTop: 92,
    marginBottom: 33,
    fontFamily: "Roboto-medium",
  },
  formWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  noAccountMessage: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    marginRight: 3,
  },
});

export default RegistrationScreen;