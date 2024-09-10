/** @format */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const use99Selector: TypedUseSelectorHook<RootState> = useSelector;
export const use99Dispatch = () => useDispatch<AppDispatch>();
