<template>

	<el-tabs style="width:100%;" type="card">
		<el-tab-pane label="机构列表">
			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item>
						<el-input v-model="formInline.user" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="search">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>

			<!--列表-->
			<template>
				<el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
					<el-table-column type="index" width="60">
					</el-table-column>
					<el-table-column prop="name" label="机构名称" width="180" sortable></el-table-column>
					<el-table-column prop="area_id" label="归属区域" width="180" sortable></el-table-column>
					<el-table-column prop="code" label="机构编码" width="180" sortable></el-table-column>
					<el-table-column prop="type" label="机构类型" width="180" sortable></el-table-column>
					<el-table-column prop="remarks" label="备注" width="180" sortable></el-table-column>
					<el-table-column inline-template :context="_self" label="操作">
						<span>
					<el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDel(row)">删除</el-button>
					<el-button type="text" size="small" @click="handleDel(row)">添加下级组织</el-button>
				</span>
					</el-table-column>
				</el-table>
			</template>

			<!--分页-->
			<el-col :span="24" class="toolbar" style="padding-bottom:10px;">
				<el-pagination :current-page="1" :page-sizes="[10, 50, 200]" :page-size="10" layout="total, prev, pager, next, jumper" :total="total"
					style="float:right" @current-change="pageChanged">
				</el-pagination>
			</el-col>
		</el-tab-pane>
		<el-tab-pane label="机构添加">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm" style="margin:10px;width:50%;min-width:200px;">
				<el-form-item label="上级机构" prop="parent_id">
					<el-input v-model="editForm.parent_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="归属区域" prop="area_id">
					<el-input v-model="editForm.area_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="机构名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="机构编码" prop="code">
					<el-input v-model="editForm.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="机构级别" prop="grade">
					<el-input v-model="editForm.grade" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否可用" prop="USEABLE">
					<el-input v-model="editForm.USEABLE" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="主负责人" prop="PRIMARY_PERSON">
					<el-input v-model="editForm.PRIMARY_PERSON"></el-input>
				</el-form-item>
				<el-form-item label="副负责人" prop="DEPUTY_PERSON">
					<el-input v-model="editForm.DEPUTY_PERSON" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系地址" prop="address">
					<el-input v-model="editForm.address" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮政编码" prop="zip_code">
					<el-input v-model="editForm.zip_code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input on-text="" off-text="" v-model="master"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="editForm.phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="传真" prop="fax">
					<el-input v-model="editForm.fax" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.remarks"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click.native="editFormVisible = false">取 消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{btnEditText}}</el-button>
				</el-form-item>
			</el-form>


		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import util from '../../common/util'
	import NProgress from 'nprogress'
	import tmp_data from '../../data/office.json'

  export default {
			  mounted: function() {
		this.pageChanged(1);
	  },
    data() {
      return {
				formInline: {
					user: ''
				},
				editFormVisible:false,//编辑界面显是否显示
				editFormTtile:'编辑',//编辑界面标题
				//编辑界面数据
				editForm: {
					"id": 10,
					"parent_id": 7,
					"parent_ids": "0,1,7,",
					"name": "市场部",
					"sort": 30,
					"area_id": 3,
					"code": 200003,
					"type": 2,
					"grade": 2,
					"address": "NULL",
					"zip_code": "NULL",
					"master": "NULL",
					"phone": "NULL",
					"fax": "NULL",
					"email": "NULL",
					"USEABLE": 1,
					"PRIMARY_PERSON": "NULL",
					"DEPUTY_PERSON": "NULL",
					"create_by": 1,
					"create_date": "2013-05-27 08:00:00.000",
					"update_by": 1,
					"update_date": "2013-05-27 08:00:00.000",
					"remarks": "NULL"
				},
				editLoading:false,
				btnEditText:'提 交',
				editFormRules:{
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				tableData: tmp_data,
				listLoading:false
     		}
    },
	computed: {
		editForm_login_flag : {
			get() {
				return this.editForm.login_flag == '1';
			},
			set(v) {
				this.editForm.login_flag = v ? '1' : '0'
			}
		},
		total: function() {
			return tmp_data.length;
		}
	},
    methods: {
			//性别显示转换
			formatSex:function(row, column){
				return row.sex==1?'男':row.sex==0?'女':'未知';
			},
			//删除记录
			handleDel:function(row){
				//console.log(row);
				var _this=this;
				this.$confirm('确认删除该记录吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					_this.listLoading=true;
					NProgress.start();
					setTimeout(function(){
						for(var i=0;i<_this.tableData.length;i++){
							if(_this.tableData[i].id==row.id){
								_this.tableData.splice(i,1);

								_this.listLoading=false;
								NProgress.done();
								_this.$notify({
									title: '成功',
									message: '删除成功',
									type: 'success'
								});

								break;
							}
						}
					},1000);
				}).catch(() => {
							
				});
			},
			//显示编辑界面
			handleEdit:function(row){
				this.editFormVisible=true;
				this.editFormTtile='编辑';
				this.editForm.id=row.id;
				this.editForm.name=row.name;
				this.editForm.company_id=row.company_id;
				this.editForm.office_id=row.office_id;
				this.editForm.login_name=row.login_name;
				this.editForm.no=row.no;
				this.editForm.email=row.email;
				this.editForm.phone=row.phone;
				this.editForm.mobile=row.mobile;
				this.editForm.photo=row.photo;
				this.editForm.login_flag=row.login_flag;
				this.editForm.user_type=row.user_type;
			},
			//编辑 or 新增
			editSubmit:function(){
				var _this=this;

				_this.$refs.editForm.validate((valid)=>{
					if(valid){
						
						_this.$confirm('确认提交吗？','提示',{}).then(()=>{
							_this.editLoading=true;
							NProgress.start();
							_this.btnEditText='提交中';
							setTimeout(function(){
								_this.editLoading=false;
								NProgress.done();
								_this.btnEditText='提 交';
								_this.$notify({
									title: '成功',
									message: '提交成功',
									type: 'success',
									duration: 100
								});
								_this.editFormVisible = false;

								if(_this.editForm.id==0){
									//新增
									_this.tableData.push({
										id:new Date().getTime(),
										name: _this.editForm.name,
										sex: _this.editForm.sex,
										age: _this.editForm.age,
										birth: _this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd'),
										addr: _this.editForm.addr
									});
								}else{
									//编辑
									for(var i=0;i<_this.tableData.length;i++){
										if(_this.tableData[i].id==_this.editForm.id){
											_this.tableData[i].name=_this.editForm.name;
											_this.tableData[i].sex=_this.editForm.sex;
											_this.tableData[i].age=_this.editForm.age;
											_this.tableData[i].birth=_this.editForm.birth==''?'':util.formatDate.format(new Date(_this.editForm.birth),'yyyy-MM-dd');
											_this.tableData[i].addr=_this.editForm.addr;
											break;
										}
									}
								}
							},1000);
						
						});

					}
				});

			},
			//显示新增界面
			handleAdd:function(){
				var _this=this;

				this.editFormVisible=true;
				this.editFormTtile='新增';
				
				this.editForm.id=0;
				this.editForm.name='';
				this.editForm.sex=1;
				this.editForm.age=0;
				this.editForm.birth='';
				this.editForm.addr='';
			},
			pageChanged: function(val){
				var _this=this;
				console.log(arguments)
				_this.tableData = tmp_data.filter((user, index)=>{ if (index< val*10 && index >= (val == 0 ? 0 : val - 1)*10 ) return true;}) 
			}
    }
  }
</script>

<style scoped>
	.toolbar .el-form-item {
		margin-bottom: 10px;
	}
	
	.toolbar {
		background: #fff;
		padding: 10px 10px 0px 10px;
	}
</style>