import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/slices";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
