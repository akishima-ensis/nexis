import { load } from 'cheerio';
import { promises as fsPromises } from "fs" ;
import { SeatData, Room } from '@/types/seat';

const TARGET_URL = 'https://webreserv.library.akishima.tokyo.jp/webReserv/AreaInfo/Login';

const retrieveHtmlContent = async(local = false): Promise<string> => {
    if (local) {
        const filePath = '/workspace/nexis/html/seat-1.html';
        const body = await fsPromises.readFile(filePath, 'utf-8');
        return body
    }

    const response = await fetch(TARGET_URL);
    const body = await response.text();

    return body;
};

const safePerseInt = (text: string) => {
    const parsed = parseInt(text);
    return isNaN(parsed) ? 0 : parsed;
};

const extractSeatDataFromHtml = (body: string): SeatData => {
    const $ = load(body);
    const updatedAtText = $('.check_date').text().trim();
    const updatedAt = new Date(updatedAtText.replace(' 更新', ''));
    const rooms: Room[] = [];
    $('table.seat tr').each((index, element) => {
        if (index === 0) return;

        const name = $(element).find('.corner_name').text().trim() as Room['name'];
        const availableSeatCountText = $(element).find('.seat_counts').eq(0).text().trim();
        const totalSeatCountText = $(element).find('.seat_counts').eq(2).text().trim();

        const seat = {
            name,
            availableSeatCount: safePerseInt(availableSeatCountText),
            totalSeatCount: safePerseInt(totalSeatCountText),
        }
        rooms.push(seat);
    });

    return {
        rooms,
        updatedAt
    };
};


export const createSeatData = async() => {
    const body = await retrieveHtmlContent();
    const seatData = extractSeatDataFromHtml(body);

    console.log(seatData);

    // TODO: Process to store in DB
}

