package com.lx.util;

import java.util.UUID;

public class UUidUtil {
   public static String getUuid(){
	   return UUID.randomUUID().toString().substring(0, 18).toLowerCase();
   }
}
