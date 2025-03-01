<template>
	<header :class="$style.root" :style="noteHeaderViewProp">
		<MkA v-user-preview="note.user.id" :class="$style.name" :to="userPage(note.user)" :style="noteHeaderContentProp">
			<MkUserName :user="note.user" />
		</MkA>
		<div v-if="note.user.isBot" :class="$style.isBot">bot</div>
		<div :class="$style.username" :style="noteHeaderContentProp">
			<MkAcct :user="note.user" />
		</div>
		<div v-if="note.user.badgeRoles" :class="$style.badgeRoles" :style="[noteHeaderRoleProp, noteHeaderContentProp]">
			<img v-for="role in note.user.badgeRoles" :key="role.id" v-tooltip="role.name" :class="$style.badgeRole" :src="role.iconUrl" />
		</div>
		<div :class="$style.info">
			<MkA :to="notePage(note)">
				<MkTime :time="note.createdAt" />
			</MkA>
			<span v-if="(note.visibility !== 'public' && note.visibility !== 'relational') || (note.visibility === 'relational' && isRelationalAvailable)" style="margin-left: 0.5em;" :title="i18n.ts._visibility[note.visibility]">
				<i v-if="note.visibility === 'home'" class="ti ti-home"></i>
				<i v-else-if="note.visibility === 'followers'" class="ti ti-lock"></i>
				<i v-else-if="note.visibility === 'specified'" ref="specified" class="ti ti-mail"></i>
				<i v-else-if="note.visibility === 'relational' && isRelationalAvailable" class="ti ti-circles-relation"></i>
			</span>
			<span v-if="note.localOnly" style="margin-left: 0.5em;" :title="i18n.ts._visibility['disableFederation']"><i class="ti ti-rocket-off"></i></span>
			<span v-if="note.channel" style="margin-left: 0.5em;" :title="note.channel.name"><i class="ti ti-device-tv"></i></span>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import * as misskey from 'misskey-js';
import { i18n } from '@/i18n';
import { notePage } from '@/filters/note';
import { userPage } from '@/filters/user';
import { defaultStore } from '@/store';

// dream での追加
import { isRelationalAvailable } from '@/scripts/relational';

defineProps<{
	note: misskey.entities.Note;
	pinned?: boolean;
}>();


const headerWrapStyles = {
	flexWrap: "wrap"
};

const headerContentStyles = {
	flexShrink: "4",
	textOverflow: "clip"
};

const roleScrollStyles = {
	overflowX: "auto"
};

const roleDisableStyles = {
	display: "none"
};

const noteHeaderViewProp = computed(() => {
	const style: string = defaultStore.state.noteHeaderViewStyle;
	if (style === "wrap") {
		return headerWrapStyles;
	}
});

const noteHeaderRoleProp = computed(() => {
	const style: string = defaultStore.state.noteHeaderRoleView;
	if (style === "scrollable") {
		return roleScrollStyles;
	}
	if (style === "disable") {
		return roleDisableStyles;
	}
});

const noteHeaderContentProp = computed(() => {
	const style: string = defaultStore.state.noteHeaderViewStyle;
	if (style === "oneLine") {
		return headerContentStyles;
	}
});
</script>

<style lang="scss" module>
.root {
	display: flex;
	align-items: baseline;
	white-space: nowrap;
}

.name {
	flex-shrink: 1;
	display: block;
	margin: 0 .5em 0 0;
	padding: 0;
	overflow: hidden;
	font-size: 1em;
	font-weight: bold;
	text-decoration: none;
	text-overflow: ellipsis;

	&:hover {
		text-decoration: underline;
	}
}

.isBot {
	flex-shrink: 0;
	align-self: center;
	margin: 0 .5em 0 0;
	padding: 1px 6px;
	font-size: 80%;
	border: solid 0.5px var(--divider);
	border-radius: 3px;
}

.username {
	flex-shrink: 9999999;
	margin: 0 .5em 0 0;
	overflow: hidden;
	text-overflow: ellipsis;
}

.info {
	flex-shrink: 0;
	margin-left: auto;
	font-size: 0.9em;
}

.badgeRoles {
	margin: 0 .5em 0 0;
}

.badgeRole {
	height: 1.3em;
	vertical-align: -20%;

	& + .badgeRole {
		margin-left: 0.2em;
	}
}
</style>
