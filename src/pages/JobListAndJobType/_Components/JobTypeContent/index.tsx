import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";

export default function JobTypeContent() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [inputValue, setInputValue] = useState<string>(searchParams.get("maLoaiCongviec") ?? "".trim());
    console.log("🚀 ~ JobTypeContent ~ inputValue: ", inputValue);

    return (
        <div>JobTypeContent</div>
    );
}

