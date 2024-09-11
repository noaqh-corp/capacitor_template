import { initialize }                                                         from "@ionic/core/components"
import { defineCustomElement as defineCustomElementIonApp }                   from '@ionic/core/components/ion-app'
import { defineCustomElement as defineCustomElementIonNav }                   from '@ionic/core/components/ion-nav'
import { defineCustomElement as defineCustomElementIonTabs }                  from '@ionic/core/components/ion-tabs'
import { defineCustomElement as defineCustomElementIonTab }                   from '@ionic/core/components/ion-tab'
import { defineCustomElement as defineCustomElementIonTabBar }                from '@ionic/core/components/ion-tab-bar'
import { defineCustomElement as defineCustomElementIonTabButton }             from '@ionic/core/components/ion-tab-button'
import { defineCustomElement as defineCustomElementIonHeader }                from '@ionic/core/components/ion-header'
import { defineCustomElement as defineCustomElementIonToolbar }               from '@ionic/core/components/ion-toolbar'
import { defineCustomElement as defineCustomElementIonContent }               from '@ionic/core/components/ion-content'
import { defineCustomElement as defineCustomElementIonBackButton }            from '@ionic/core/components/ion-back-button'
import { defineCustomElement as defineCustomElementIonInfiniteScroll }        from '@ionic/core/components/ion-infinite-scroll'
import { defineCustomElement as defineCustomElementIonInfiniteScrollContent } from '@ionic/core/components/ion-infinite-scroll-content'
import { defineCustomElement as defineCustomElementIonList }                  from '@ionic/core/components/ion-list'
import { defineCustomElement as defineCustomElementIonRefresher }             from '@ionic/core/components/ion-refresher'
import { defineCustomElement as defineCustomElementIonRefresherContnet }      from '@ionic/core/components/ion-refresher-content'
import App from './App.svelte'

/** CSSのインポート */
import "@ionic/core/css/ionic.bundle.css"

/**
 * 初期化処理
 */
const init = (): void => {
  /** Ionicの初期化処理 */
  initialize()
  /** Ionicの各種コンポーネントをカスタムエレメントとして定義 */
  defineCustomElements()
  /** body直下にApp.svelteを埋め込む */
  new App({
    target: document.body
  })
  /** htmlタグにion-ceクラスを追加 (bodyをdisplay:block;に) */
  document.documentElement.classList.add('ion-ce')
}

/**
 * Ionicのコンポーネントをカスタムエレメントとして定義
 * 使いたいコンポーネントだけdefineCustomElementをimportして実行する
 */
const defineCustomElements = (): void => {
  defineCustomElementIonApp()
  defineCustomElementIonNav()
  defineCustomElementIonTabs()
  defineCustomElementIonTab()
  defineCustomElementIonTabBar()
  defineCustomElementIonTabButton()
  defineCustomElementIonHeader()
  defineCustomElementIonToolbar()
  defineCustomElementIonContent()
  defineCustomElementIonBackButton()
  defineCustomElementIonInfiniteScroll()
  defineCustomElementIonInfiniteScrollContent()
  defineCustomElementIonList()
  defineCustomElementIonRefresher()
  defineCustomElementIonRefresherContnet()
}

/** 初期化処理をdefaultとしてexport */
export default init()