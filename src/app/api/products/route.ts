import { NextResponse } from "next/server";
import { getProducts } from "../../../../../guardian/src/services/product.service";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json({
    success: true,
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
}
