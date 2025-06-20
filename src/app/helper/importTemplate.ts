import axios from "axios";

export class ImportTemplateHelper {
  private getBasePath(): string {
    return `${window.location.origin}/imports/`;
  }

  getImportFile(fileName: string): Promise<Blob> {
    const filePath = `${this.getBasePath()}${fileName}`;
    return axios
      .get(filePath, { responseType: "blob" })
      .then((response) => response.data);
  }
}
