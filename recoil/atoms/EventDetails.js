import { atom, selector } from 'recoil';

export const eventDetailsState = atom({
  key: 'eventDetails',
  default: {
    title: "Art Show 🎨",
    author: "By Olivia Adams",
    date: "Monday, Nov 13 2023",
    duration: "6:00 PM - 10:00 PM",
    address: "Lower Manhattan",
    remaningTicket: "78/100",
    invitationCount: "100+ invited",
    price: "$10.00 - $50.00",
    description: "Come join me in celebrating my 25th birthday ! I can't wait to celebrate with all of you at the party!",
    purchased: false
  },
});


export const eventDetailsSelector = selector({
  key: "getEventDetailsAPI",
  get: async ({ get }) => {
    // await new Promise((resolve) => setTimeout(resolve, 800));

    const event = {
      title: "Art Show 🎨",
      author: "By Olivia Adams",
      date: "Monday, Nov 13 2023",
      duration: "6:00 PM - 10:00 PM",
      address: "Lower Manhattan",
      remaningTicket: "78/100",
      invitationCount: "100+ invited",
      price: "$10.00 - $50.00",
      description: "Come join me in celebrating my 25th birthday ! I can't wait to celebrate with all of you at the party!",
      purchased: false
    }
    
    return event;
  }
});
  