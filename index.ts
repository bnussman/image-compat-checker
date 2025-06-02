import { deleteImage, getRegions, setToken, uploadImage } from "@linode/api-v4";

if (!process.env.LINODE_TOKEN) {
  throw new Error("Please set LINODE_TOKEN in your env");
}

setToken(process.env.LINODE_TOKEN);

const regions = await getRegions({ page_size: 500 });

const doesRegionSupportImageUpload = new Map<string, boolean>();

for (const region of regions.data) {
  console.log("🌎 Checking", region.label, `(${region.id})`);

  try {
    const uploadResponse = await uploadImage({ region: region.id, label: "my-image-1" })
    doesRegionSupportImageUpload.set(region.id, true);
    console.log("✅", region.label, `(${region.id})`, "does support images");

    try {
      await deleteImage(uploadResponse.image.id);
    } catch(error) {
      console.error("Clean up failed for Image in", region.id);
    }
  } catch (error) {
    console.error((error as any).response?.data?.errors?.[0]?.reason ?? (error as any).toString());
    doesRegionSupportImageUpload.set(region.id, false);
    console.log("❌", region.label, `(${region.id})`, "does not seem to support images");
  }

  await Bun.sleep(500);
}

console.log("Region Overview")
console.table(doesRegionSupportImageUpload)

const regionsThatSupportObjButDontSupportImages = regions.data
  .filter((region) => region.capabilities.includes("Object Storage") && !doesRegionSupportImageUpload.get(region.id))
  .map((region) => ({ id: region.id, label: region.label }));

console.log("Regions that support Object Stoage, but don't support Image Upload")
console.table(regionsThatSupportObjButDontSupportImages);