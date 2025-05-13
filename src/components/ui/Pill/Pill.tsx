import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { SuiteContext } from "node:test";


type PillProps = {
    /**text to display on the Pill */
    text: string;
    /**Color for the Pill that can be deafulat destructie,succes,custom */
    color?: "default" | "destructive" | "success" | "custom";
}

const Pill = ({text,color = "default"}: PillProps) => {
    const colorMap = {
        default: "",
        destructive: "bg-red-500 text-white",
        success:"bg-green-500 text-white",
        custom:"bg-blue-500 text-white border-purlple-900",
    }

    return (
        <Badge className={cn("rounded-full px-3 py-1 text-sm", colorMap[color])}>
            {text}
        </Badge>
    );
    
};

export default Pill;
