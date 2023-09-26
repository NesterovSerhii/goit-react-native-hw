import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
    View,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/btn";

const LoginScreen = () => {
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
              <Text style={styles.title}>Увійти</Text>
              <View style={styles.formWrapper}>
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
                    text={"Увійти"}
                  />
                
              </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.noAccountMessage}>
                    Немає акаунту?&nbsp;
                    <Text style={{ textDecorationLine: "underline" }}>
                       Зареєструватися
                    </Text>
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
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 111,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
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

export default LoginScreen;