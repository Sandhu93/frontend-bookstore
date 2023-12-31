import { Slider } from "antd";
import { memo, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { setPriceRange } from "store/slice/filterSlice";
import { useAppDispatch } from "store/configureStore";
import Button from "components/button";
import styles from "./index.module.scss";

type Input = { min: number | string; max: number | string };

const PriceRange = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [input, setInput] = useState<Input>({ min: 0, max: 10000 });

  const setMin = (value: string) => {
    let min = (+value >= input.max ? input.max : +value) || "";
    setInput((state) => ({ ...state, min }));
  };

  const setMax = (value: string) => {
    let max = (+value <= input.min ? input.min : +value) || "";
    setInput((state) => ({ ...state, max }));
  };

  const onChange = (value: number[]) => {
    const [min, max] = value;
    setInput({ min, max });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setPriceRange(input));
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <p className="bg-gray-400 text-white px-4 py-2 text-left">{t("priceRange")}</p>
      <div className="flex justify-between items-center gap-2 px-4 mt-4">
        <input
          className={styles["range-input"]}
          type="number"
          name="min"
          value={input.min}
          onChange={(e) => setMin(e.target.value)}
        />
        <span>-</span>
        <input
          className={styles["range-input"]}
          type="number"
          name="max"
          value={input.max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>

      <div className="px-4 mt-6">
        <Slider range min={0} max={10000} value={[+input.min, +input.max]} onChange={(value) => onChange(value)} />
      </div>

      <Button className={styles["btn-submit"]} type="submit">
        {t("filterPrice")}
      </Button>
    </form>
  );
};

export default memo(PriceRange);
