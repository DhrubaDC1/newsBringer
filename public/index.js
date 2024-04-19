// Connect to the server
const socket = io("http://localhost:3000");
console.log("🚀 ~ socket:", socket);

// Send a message to the server
// socket.emit("message", "Hello, server!");
socket.on("message", (data) => {
  var loaderAnimation = document.getElementById("loaderAnimation");
  var newsDiv = document.getElementById("newsDiv");
  var contentDiv = document.getElementById("content");
  console.log("Received message from server:", data);
  contentDiv.innerHTML = data;
  loaderAnimation.style.display = "none";
  newsDiv.style.display = "flex";
});

async function fetchNewsFromAPI() {
  const options = {
    method: "GET",
    url: "https://news67.p.rapidapi.com/v2/topic-search",
    params: {
      languages: "en",
      search: "technology",
    },
    headers: {
      "X-RapidAPI-Key": "21b47da7c0msh3eb4d474601deb2p17e3abjsn5d59618eaacc",
      "X-RapidAPI-Host": "news67.p.rapidapi.com",
    },
  };

  try {
    // const response = await axios.request(options);
    // let data = response.data;
    // let news = data.news;
    // let newsArr = [];
    // news.forEach((element) => {
    //   let { Title: title, Url: url, Description: desc, Image: img } = element;
    //   let newsObj = { title, url, desc, img };
    //   //   console.log(newsObj);
    //   newsArr.push(newsObj);
    // });
    document.addEventListener("DOMContentLoaded", function () {
      const title = document.getElementById("title");
      title.innerText = "Technology News";
      const newsList = document.getElementById("newsList"); // Assuming you have an HTML element with id 'newsList' where you want to append the list

      // Loop through the array and create list items for each title
      const newsArr = [
        {
          title:
            "Jokowi urges China to expedite Surabaya HSR feasibility study: Retno",
          url: "http://www.thejakartapost.com/business/2024/04/19/jokowi-urges-china-to-expedite-surabaya-hsr-feasibility-study-retno.html",
          desc: "Jokowi urges China to expedite Surabaya HSR feasibility study: Retno - Regulations - The Jakarta Post",
          img: "https://img.jakpost.net/c/2024/01/29/2024_01_29_146825_1706534402._large.jpg",
        },
        {
          title:
            "SeaPRwire to Distribute Press Releases Globally for Leading Hong Kong Wealth Management Firms",
          url: "http://www.acnnewswire.com/press-release/japanese/88658/seaprwire-to-distribute-press-releases-globally-for-leading-hong-kong-wealth-management-firms",
          desc: "",
          img: "https://photos.acnnewswire.com/20240122.SeaPRwire.jpg",
        },
        {
          title:
            "Isuzu Joins Multi-interest Agreement to Promote Regional Transportation DX Self-driving Bus PoC Launched in Hiratsuka Ci",
          url: "http://www.acnnewswire.com/press-release/english/88660/isuzu-joins-multi-interest-agreement-to-promote-regional-transportation-dx-self-driving-bus-poc-launched-in-hiratsuka-city",
          desc: "Mitsubishi Corporation (MC) is pleased to announce that on January 19, 2024, Isuzu Motors Ltd. (Isuzu) became a new signatory to an agreement previously reached by MC and four other interests to collaborate on digital transformations (DX) in regional public transportation.",
          img: "https://photos.acnnewswire.com/0000052723_img2.jpg",
        },
        {
          title:
            "Crypto Oasis, Crypto Valley, the DLT Science Foundation and Inacta Ventures Join Forces in a Groundbreaking Initiative",
          url: "http://www.acnnewswire.com/press-release/english/88668/crypto-oasis,-crypto-valley,-the-dlt-science-foundation-and-inacta-ventures-join-forces-in-a-groundbreaking-initiative",
          desc: "Crypto Oasis, Crypto Valley, the DLT Science Foundation and Inacta Ventures Join Forces in a Groundbreaking Initiative.Crypto Oasis, Crypto Valley, the DLT Science Foundation, and Inacta Ventures united to unveil the Global Protocol Report at The Hub of Casper Labs in Davos on the 17th of January 2024.",
          img: "https://photos.acnnewswire.com/Crypto12324Fig2.jpg",
        },
        {
          title:
            "Fujitsu signs naming rights agreement for Todoroki Athletics Stadium",
          url: "http://www.acnnewswire.com/press-release/english/88676/fujitsu-signs-naming-rights-agreement-for-todoroki-athletics-stadium",
          desc: "Fujitsu today announced that on January 17 it signed a naming rights agreement with Kawasaki Todoroki Park Corporation for the Todoroki Athletics Stadium located in Kawasaki City, Kanagawa Prefecture, Japan. Based on this agreement, the Todoroki Athletics Stadium will be called",
          img: "https://photos.acnnewswire.com/NamingRightsContract.jpg",
        },
        {
          title: "CRN Recognizes Dazz as a Cloud 100 Company for 2024",
          url: "http://www.acnnewswire.com/press-release/english/88665/crn-recognizes-dazz-as-a-cloud-100-company-for-2024",
          desc: "",
          img: "https://www.acnnewswire.com/images/company/Dazz.jpg",
        },
        {
          title:
            "MHI Completed manufacturing of Three Replacement Steam Generators for EDF's Nuclear Power Plant",
          url: "http://www.acnnewswire.com/press-release/english/88659/mhi-completed-manufacturing-of-three-replacement-steam-generators-for-edf's-nuclear-power-plant",
          desc: "Mitsubishi Heavy Industries, Ltd. (MHI) held a ceremony for shop manufacturing completion of three replacement steam generators for",
          img: "https://www.acnnewswire.com/images/company/MHI_new.jpg",
        },
        {
          title:
            "Aurangzeb banks on strong economic indicators for stable rupee",
          url: "https://tribune.com.pk/story/2463122/aurangzeb-banks-on-strong-economic-indicators-for-stable-rupee",
          desc: "Finance minister meets US, IMF, World Bank officials in Washington",
          img: "https://i.tribune.com.pk/media/images/FinanceMinisterMuhammadAurangzebAPP1711113329-0/FinanceMinisterMuhammadAurangzebAPP1711113329-0.jpg",
        },
        {
          title: "IT, high-tech makers power industry in Q1",
          url: "http://www.china.org.cn/business/2024-04/19/content_117135862.htm",
          desc: "",
          img: "http://images.china.cn/site1007/2024-04/19/117135862_46f24a2b-1c61-48a9-b646-21a680e286f2.jpg",
        },
        {
          title: "Türkiye, China look to expand cooperation at economic forum",
          url: "http://www.china.org.cn/world/2024-04/19/content_117135832.htm",
          desc: "",
          img: "http://comments.china.org.cn/comments/jcaptcha",
        },
        {
          title: "1st batch of participating companies for 7th CIIE unveiled",
          url: "http://www.china.org.cn/business/2024-04/19/content_117136124.htm",
          desc: "",
          img: "http://images.china.cn/site1007/2024-04/19/117136124_32551df6-32b9-46a6-82ce-1a22b9651c27.jpeg",
        },
        {
          title: "Huawei's new smartphone series seen as key to revival",
          url: "http://www.china.org.cn/business/2024-04/19/content_117135893.htm",
          desc: "",
          img: "http://images.china.cn/site1007/2024-04/19/117135893_fd2a0591-edb0-48b7-ba1a-1adf851ab60a.jpg",
        },
        {
          title:
            "Rockwell Automation banks on digital, green transition in China",
          url: "http://usa.chinadaily.com.cn/a/202404/19/WS6621c91fa31082fc043c2d69.html",
          desc: "US-based industrial automation company Rockwell Automation is eyeing opportunities arising from China's digital and green transformation, a senior executive said.",
          img: "http://img2.chinadaily.com.cn/images/202404/19/6621c91ea31082fc2b6c6b52.jpeg",
        },
        {
          title: "Beijing warns of heavy catkin season on way",
          url: "http://usa.chinadaily.com.cn/a/202404/19/WS6621caf2a31082fc043c2d86.html",
          desc: "",
          img: "http://img2.chinadaily.com.cn/images/202404/19/6621caf1a31082fc2b6c6ba6.jpeg",
        },
        {
          title: "IT, high-tech makers power industry in Q1",
          url: "http://usa.chinadaily.com.cn/a/202404/19/WS6621a72ba31082fc043c2ca4.html",
          desc: "",
          img: "http://img2.chinadaily.com.cn/images/202404/19/6621a72ba31082fc2b6c6816.jpeg",
        },
      ];
      console.log("🚀 ~ newsArr.forEach ~ newsArr:", newsArr);

      newsArr.forEach((item) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = item.title;
        link.classList.add(
          "block",
          "py-4",
          "hover:bg-opacity-20",
          "hover:bg-blue-500",
          "rounded-3xl",
          "w-fit",
          "px-4"
        );
        // Add click event listener to each link
        link.addEventListener("click", function (event) {
          var loaderAnimation = document.getElementById("loaderAnimation");
          var listDiv = document.getElementById("listDiv");
          var newsDiv = document.getElementById("newsDiv");
          var contentDiv = document.getElementById("content");
          console.log(event.target.innerHTML);
          socket.emit("message", event.target.innerHTML);
          loaderAnimation.style.display = "flex";
          listDiv.style.display = "none";
          title.innerText = event.target.innerHTML;
        });
        listItem.appendChild(link);
        newsList.appendChild(listItem);
      });
      return newsArr;
    });
  } catch (error) {
    console.error(error);
  }
}

const newsArr = fetchNewsFromAPI();

// runChat();
