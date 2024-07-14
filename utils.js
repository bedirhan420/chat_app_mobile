import * as ImagePicker from "expo-image-picker";
import { nanoid } from "nanoid";
import "react-native-get-random-values";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function pickImage() {
  let result = await ImagePicker.launchCameraAsync();
  return result;
}

export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

//
export async function uploadImage(uri, path, fName) {
  //resim yüklemek için gereken httprequest ve sonrasında gelen garip işlemler
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileName = fName || nanoid();
  const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: "image/jpeg",
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);

  return { url, fileName };
}

/*
Bu işlev, belirtilen bir uri (dosya yolunu) kullanarak bir resmi bulur, bu resmi bir Blob nesnesine dönüştürür, ardından bu Blob'u bir depolama hedefine yükler (örneğin Firebase Storage) ve yükleme işlemi tamamlandığında bu yüklenmiş resmin URL'sini döndürür.

Aşağıda işlevin adım adım açıklaması:

Resmi Blob'a dönüştürme:

İlk olarak, belirtilen uri (dosya yolunu) kullanarak bir XMLHttpRequest (XHR) kullanılır. Bu, belirtilen uri'daki veriyi alır ve bir Blob'a dönüştürür. Blob, veriyi binary formatta saklar.
Dosya adı oluşturma:

fileName değişkeni, yüklenen dosyanın adını temsil eder. Eğer kullanıcı fName parametresini belirtmemişse, nanoid kullanarak rastgele bir dosya adı oluşturulur.
Depolama referansı oluşturma:

imageRef, resmin nereye yükleneceğini belirler. Bu referans, depolama hedefini (örneğin Firebase Storage) ve dosyanın yolunu (path) ve adını içerir.
Blob'u yükleme:

uploadBytes işlemi, Blob'u oluşturulan depolama referansına yükler. Ayrıca, içeriğin türünü (contentType) belirtir. Bu durumda, image/jpeg olarak belirtilmiş.
Blob'u kapatma:

Blob, artık kullanılmadığında kapatılmalıdır. Bu, gereksiz bellek kullanımını önler.
Yükleme işlemi tamamlandığında URL alınması:

getDownloadURL işlemi, yüklenen resmin URL'sini alır. Bu URL, yüklenen resme erişmek için kullanılır.
Sonuç olarak, işlev, yükleme işlemi tamamlandığında yüklenen resmin URL'sini ve dosya adını içeren bir nesne döndürür. Bu, resim yükleme işlemi gerçekleştirmek için kullanışlı bir işlemdir ve özellikle bulut depolama hizmetleri (örneğin Firebase Storage gibi) kullanırken sıkça kullanılır.
*/

const palette = {
  tealGreen: "#128c7e",
  tealGreenDark: "#075e54",
  green: "#25d366",
  lime: "#dcf8c6",
  skyblue: "#34b7f1",
  smokeWhite: "#ece5dd",
  white: "white",
  gray: "#3C3C3C",
  lightGray: "#757575",
  iconGray: "#717171",
};

export const theme = {
  colors: {
    background: palette.smokeWhite,
    foreground: palette.tealGreenDark,
    primary: palette.tealGreen,
    tertiary: palette.lime,
    secondary: palette.green,
    white: palette.white,
    text: palette.gray,
    secondaryText: palette.lightGray,
    iconGray: palette.iconGray,
  },
};
