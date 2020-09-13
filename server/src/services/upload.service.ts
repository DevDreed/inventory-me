import HttpException from "../exceptions/HttpException";
import { isEmptyObject } from "../utils/util";
import { db } from "../db";
import { FileArray } from "express-fileupload";
import { Product } from "interfaces/products.interface";
import { log } from "console";

class UploadService {
  public async upload(id: string, files: FileArray): Promise<any> {
    if (id === "") throw new HttpException(400, "No product selected");
    if (isEmptyObject(files)) throw new HttpException(400, "No file uploaded");

    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    const findProduct: Product = result.rows[0];
    log(findProduct);
    const { file } = files;
    file.mv(`../client/public/uploads/${file.name}`, (err) => {
      if (err) {
        throw new HttpException(500, err);
      }

      return { fileName: file.name, filePath: `/uploads/${file.name}` };
    });
  }
}

export default UploadService;
