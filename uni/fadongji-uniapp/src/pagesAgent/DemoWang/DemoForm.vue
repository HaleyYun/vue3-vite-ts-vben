<template>
	<view class="wrap">
		<view class="wrap-title">From列表验证码</view>
		<EraForm labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<EraFormItem labelWidth="100" label="姓名" borderBottom ref="item1">
				<u--input placeholder="请输入姓名" border="none"/>
			</EraFormItem>
			<EraFormItem labelWidth="100" label="手机号" borderBottom ref="item1">
				<u--input placeholder="请输入手机号" border="none"/>
			</EraFormItem>
			<EraFormItem labelWidth="100" label="日期" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
				<u--input v-model="model1.userInfo.data" disabled disabledColor="#ffffff" border="none"/>
			</EraFormItem>
			<EraFormItem label="验证码" labelWidth="100" prop="code">
				<u--input v-model="model1.code" border="none" placeholder="请填写验证码"/>
				<view slot="right" class="form-code">
					<view class="form-code__title">获取验证码</view>
				</view>
			</EraFormItem>
			<view class="m-t-20 fz-24 bottom__title">底部说明文字底部说明文字</view>

			<view class="m-t-30"/>
			<EraFormItem label="验证码" labelWidth="100" prop="code">
				<u--input v-model="model1.code" border="none" placeholder="请填写验证码"/>
				<view slot="right" class="form-code"/>
			</EraFormItem>
			<view class="m-t-20 fz-24 bottom__title">底部说明文字底部说明文字</view>

			<view class="m-t-30"/>
			<EraFormItem label="卡号" labelWidth="100">
				<u--input value="sss" border="none" placeholder="请输入卡号"/>
				<VoIcon slot="right" name="warning"/>
			</EraFormItem>
			
			<view class="m-t-30"/>
			<EraFormItem label="标题文字" labelWidth="100">
				<u--input placeholder="请输入文本" border="none"/>
			</EraFormItem>
			
			<view class="m-t-30"/>
			<view class="m-l-30 m-r-30">
				<EraTextarea
					placeholder="请输入文本"
					v-model="model1.intro"
					maxlength="200"
					border="none"
					count
				/>
			</view>
			
			<view class="m-t-30"/>
			<EraFormItem label="86+" labelWidth="50">
				<VoIcon name="right-arrow"/>
				<view class="item-line"/>
				<u--input placeholder="请输入文本" border="none"/>
			</EraFormItem>
			
			<view class="m-t-30"/>
			<EraFormItem label="微信号" labelWidth="100" borderBottom>
				<VoIcon slot="right" name="right-arrow"/>
			</EraFormItem>
			<EraFormItem label="国家/地区" labelWidth="100">
				<view>中国</view>
				<VoIcon slot="right" name="right-arrow"/>
			</EraFormItem>
		</EraForm>
		
		<EraRadioGroup placement="column">
		  <EraRadio
		    :customStyle="{ marginBottom: '8px' }"
		    label="阅读并同意"
		    :iconSize="14"
		  />
		</EraRadioGroup>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSex: false,
				model1: {
					userInfo: {
						name: 'uView UI',
						data: '2022-11-11',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding-bottom: 20px;

		&-title {
			width: 100%;
			height: 80rpx;
			padding-left: 30rpx;
			line-height: 80rpx;
			background-color: #e5e5e5;
			color: #1a1b1c;
			font-size: 32rpx;
		}

		&-radio {
			width: 100%;
			height: 80rpx;
			background-color: #ffffff;

			&__info {
				height: 79rpx;
				line-height: 79rpx;
			}

			&__line {
				height: 1px;
				width: 750rpx - 32rpx;
				margin-left: 32rpx;
				background-color: #e5e5e5;
			}
		}
	}

	.form-code {
		background: rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		height: 46rpx;
		line-height: 46rpx;

		&__title {
			/* 正文 16pt 常规 */
			font-family: 'PingFang SC';
			font-style: normal;
			font-size: 16px;
			color: rgba(0, 0, 0, 0.85);
			padding-left: 20rpx;
			padding-right: 20rpx;
		}
	}

	.bottom__title {
		margin-left: 72rpx;
		color: rgba(0, 0, 0, 0.25);
	}
	.item-line {
		background-color: #e5e5e5;
		width: 1px;
		height: 30px;
		margin-left: 20rpx;
		margin-right: 10px;
	}
</style>
