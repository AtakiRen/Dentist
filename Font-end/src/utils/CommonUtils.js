class CommonUtils {
  static getBase64(file) {
    return new Promise((reslove, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => reslove(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export default CommonUtils;
