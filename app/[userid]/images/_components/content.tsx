"use client";
import { useImageDetail } from "@/hooks/use-image-detail";

import { Image } from "@/types/types";
import { DataTable } from "./data-table";
import { columns } from "./column";

interface ContentProps {
  images: Image[];
}

export const Content = ({ images }: ContentProps) => {
  const { setSelectedImage, onOpen } = useImageDetail();

  const handleRowClick = (data: Image) => {
    if (data) {
      setSelectedImage(data);
      onOpen();
    }
  };

  return (
    <div className="flex flex-col mx-5 overflow-hidden overflow-y-auto rounded-lg">
      <DataTable columns={columns} data={images} onRowClick={handleRowClick} />
    </div>
  );
};
