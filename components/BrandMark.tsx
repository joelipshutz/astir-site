import Image from "next/image";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}>
      <Image className="brand-icon" src="/icon.png" alt="" width={48} height={48} />
      <span className="brand-wordmark">ASTIR</span>
    </span>
  );
}
