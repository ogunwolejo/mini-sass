import {memo, NamedExoticComponent} from "react";
import {Spinner, SpinnerProps} from "@/app/components/ui/atoms/loader";

type ShowLoaderProps = SpinnerProps & {
  canShow: boolean;
};

const ShowLoader: NamedExoticComponent<ShowLoaderProps> = memo(
  ({canShow, ...rest}) => (canShow ? <Spinner {...rest} /> : null),
);

ShowLoader.displayName = "ShowLoader";
export default ShowLoader;
