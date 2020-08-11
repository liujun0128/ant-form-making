import Vue from 'vue'

import '@/core/lazy_lib/components_use'

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true

Vue.use(VueClipboard)

