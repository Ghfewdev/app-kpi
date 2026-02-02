import { useState } from "react";
import EventModal from "../Component/EventModal";
import EventForm from "../Component/EventForm";
import EventListModal from "../Component/EventListModal";


export default function Test() {
    const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);

    return (
        <>
            <button onClick={() => setOpen(true)}>➕ เพิ่มกิจกรรม</button>
            <button onClick={() => setOpenList(true)}>
                ดูรายการโครงการ
            </button>

            <EventListModal
                open={openList}
                onClose={() => setOpenList(false)}
            />

            <EventModal open={open} onClose={() => setOpen(false)}>
                <EventForm onSuccess={() => setOpen(false)} />
            </EventModal>
        </>
    );
}
