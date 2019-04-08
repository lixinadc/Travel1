package com.lx.bean;

import java.util.List;
/**
 * Page<T>  T的类型是本页数据的数据类型
 * @author OO
 *
 * @param <T>
 */
public class Page<T> {
	/**
	 * 当前页码
	 */
	private int page ;
	/**
	 * 每页数量
	 */
	private int size ;
	/**
	 * 总记录个数
	 */
	private int count ;
	/**
	 * 页码总数量
	 */
	private int pageCount ;
	/**
	 * 当前页数据
	 */
	private List<T> data ;
	
	public Page() {}
	public Page(int page , int size) {
		this.page = page ;
		this.size = size ;
	}
	
	public Page(int page, int size, int count, List<T> data) {
		super();
		this.page = page;
		this.size = size;
		this.count = count;
		this.pageCount = (int) Math.ceil(count * 1.0 / size);
		this.data = data;
	}
	
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
		this.pageCount = (int) Math.ceil(count * 1.0 / size);
	}
	public int getPageCount() {
		return pageCount;
	}
	
	public List<T> getData() {
		return data;
	}
	public void setData(List<T> data) {
		this.data = data;
	}
	
	@Override
	public String toString() {
		return "Page [page=" + page + ", size=" + size + ", count=" + count + ", pageCount=" + pageCount + ", data="
				+ data + "]";
	}


	
}
