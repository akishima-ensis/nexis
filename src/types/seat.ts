type RoomName = '学習席（有線LAN有）' | '学習席' | '研究個室' | 'インターネット・DB席' | 'グループ学習室' | 'ティーンズ学習室';

export type Room = {
    name: RoomName
    availableSeatCount: number
    totalSeatCount: number
}

export type SeatData = {
    rooms: Room[]
    updatedAt: Date
}
