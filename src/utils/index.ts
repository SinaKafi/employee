export function formDataGenerator(objToFormData: Record<string, any>) {
  const formData = new FormData();
  for (const key in objToFormData) {
    if (objToFormData[key] !== undefined) {
      formData.append(key, objToFormData[key]);
    }
  }
  return formData;
}
