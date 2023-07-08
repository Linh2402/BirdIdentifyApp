import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {windowWidth} from "../constants";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const News1 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sự đa dạng của thế giới các loài chim</Text>
        <Text style={styles.date}>26/06/2023</Text>
        <Image
          source={require("../assets/image1.1.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.content}>
          Trên hành tinh chúng ta, có hàng ngàn loài chim đa dạng và độc đáo tồn
          tại. Từ các loài chim cánh cụt tinh nghịch ở vùng Bắc Cực đến những
          chú chim cánh cụt ngụy trang ở Nam Cực, từ chim hồng hạc tuyệt đẹp ở
          Nam Mỹ đến chim đại bàng mạnh mẽ bay trên vùng sa mạc chói chang. Các
          loài chim không chỉ là những sinh vật tuyệt vời mà còn đóng vai trò
          quan trọng trong duy trì cân bằng sinh thái và tạo ra những hiện tượng
          đặc biệt trên Trái Đất.
        </Text>
        <Text style={styles.sectionTitle}>Đa dạng về hình dáng và màu sắc</Text>
        <Text style={styles.content}>
          Một trong những điều đáng ngạc nhiên về thế giới các loài chim là độ
          phong phú và đa dạng của chúng. Từ những loài chim nhỏ bé có khả năng
          hát líu lo như chim hòe, cho đến những loài chim to lớn có sức mạnh
          bay lượn như chim albatross, mỗi loài đều có những đặc điểm độc đáo và
          phong cách sống riêng. Màu sắc lông, hình dáng mỏ, cách hót và cách
          xây tổ của các loài chim đều tạo nên một sự đa dạng không thể tưởng
          tượng được.
        </Text>
        <Image
          source={require("../assets/uyen_uong.jpeg")}
          style={{width: windowWidth - 32, height: 230}}
        />
        <Text style={{fontSize: 15, marginBottom: 10, color: "#888"}}>
          Uyên ương (Aix sponsa)
        </Text>
        <Image
          source={require("../assets/vet_macaw.jpeg")}
          style={{width: windowWidth - 32, height: 230}}
        />
        <Text style={{fontSize: 15, marginBottom: 10, color: "#888"}}>
          Vẹt Macao (Ara macao)
        </Text>
        <Text style={styles.sectionTitle}>
          Sự thích ứng với môi trường sống
        </Text>
        <Text style={styles.content}>
          Các loài chim cũng thể hiện sự đa dạng và sự thích ứng tuyệt vời với
          môi trường sống. Một số loài chim sống trên các cánh đồng rộng lớn,
          tận hưởng ánh nắng mặt trời và thức ăn phong phú. Trong khi đó, những
          loài chim khác chọn sống trong rừng rậm, nơi mà sự dày đặc của cây cối
          và sự che chắn của màn sương tạo nên một môi trường sống lý tưởng cho
          chúng. Các loài chim biển cũng có khả năng bay xa và sống trên biển
          trong nhiều tháng mà không cần đặt chân lên đất liền.
        </Text>
        <Image
          source={require("../assets/canh_cut.png")}
          style={{width: windowWidth - 32, height: 230}}
        />
        <Text style={{fontSize: 15, marginBottom: 10, color: "#888"}}>
          Chim cánh cụt
        </Text>
        <Text style={styles.sectionTitle}>Các hiện tượng di cư tuyệt vời</Text>
        <Text style={styles.content}>
          Di cư là một trong những hiện tượng thú vị và kỳ diệu của các loài
          chim. Hàng triệu chim di cư hàng năm trên toàn cầu, bay hàng ngàn dặm
          để tìm kiếm nơi sinh sống mới và tìm thức ăn. Các loài chim di cư
          thường sử dụng các con đường di cư đã được thiết lập từ hàng nghìn năm
          trước, và đây là một sự hợp tác đáng kinh ngạc giữa các cá thể để đạt
          được mục tiêu chung.
        </Text>
        <Image
          source={require("../assets/chim_di_cu.jpeg")}
          style={{width: windowWidth - 32, height: 230}}
        />
        <Text style={{fontSize: 15, marginBottom: 10, color: "#888"}}>
          Hình ảnh chim di cư
        </Text>
        <Text style={styles.sectionTitle}>Văn hóa chim</Text>
        <Text style={styles.content}>
          Không chỉ có con người mới có văn hóa, các loài chim cũng có những yếu
          tố văn hóa độc đáo của riêng chúng. Chúng sử dụng những hình thức giao
          tiếp phức tạp như hát, vẽ một cách tài tình trên không trung, và thậm
          chí cả việc xây dựng những công trình kiến trúc phức hợp để làm tổ.
          Một số loài chim cũng có thói quen truyền lại kiến thức và kỹ năng qua
          các thế hệ, tạo nên một hệ thống truyền thống và sự đa dạng văn hóa
          đáng kinh ngạc.
        </Text>
        <Image
          source={require("../assets/chim_cong.jpeg")}
          style={{width: windowWidth - 32, height: 230}}
        />
        <Text style={{fontSize: 15, marginBottom: 10, color: "#888"}}>
          Chim công trống "tán tỉnh" chim mái
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#8d8d8d",
    marginBottom: 8,
    lineHeight: 20,
  },
  image: {
    width: windowWidth - 40,
    height: 225,
    marginBottom: 8,
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
});

export default News1;
