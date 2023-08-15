import { instance } from '@/instance';
import { $i } from '@/account';

export function getIsRelationalAvailable() {
	return $i != null && (new Date($i.createdAt) < new Date(instance.relationalDate));
}

export const isRelationalAvailable = getIsRelationalAvailable();
