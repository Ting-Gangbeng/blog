import { getSetting } from "@/api/setting";
import { titleController } from "@/utils"
export default {
    namespaced: true,
    state: {
        loading: false,
        data: null,
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setData(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true);
            const resp = await getSetting();
            ctx.commit("setData", resp);
            ctx.commit("setLoading", false);
            //浏览上面的头像
            if (resp.faction) {//设置标题头像
                // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
                let link = document.querySelector("link[ref='shortcut icon']")
                if (link) {
                    return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon"
                link.type = "images/x-icon";
                link.href = resp.faction;
                document.querySelector("head"), appendChild(link)
            }
            if (resp.siteTitle) {//设置网站标题
                titleController.setSiteTitle(resp.siteTitle)
            }
        },
    },
};
