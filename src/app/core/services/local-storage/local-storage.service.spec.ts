import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if there is no data for the given key', () => {
    expect(service.hasData('nonexistentKey')).toBeFalse();
  });

  it('should return true if there is data for the given key', () => {
    localStorage.setItem('testKey', 'testData');
    expect(service.hasData('testKey')).toBeTrue();
  });

  it('should return undefined if there is no data for the given key', () => {
    expect(service.getData('nonexistentKey')).toBeUndefined();
  });

  it('should return the correct data for the given key', () => {
    const testData = { name: 'test' };
    localStorage.setItem('testKey', JSON.stringify(testData));
    expect(service.getData('testKey')).toEqual(testData);
  });

  it('should save data correctly', () => {
    const testData = { name: 'test' };
    service.saveData('testKey', testData);
    expect(localStorage.getItem('testKey')).toEqual(JSON.stringify(testData));
  });

  it('should remove data for the given keys', () => {
    localStorage.setItem('key1', 'data1');
    localStorage.setItem('key2', 'data2');
    service.removeData(['key1', 'key2']);
    expect(localStorage.getItem('key1')).toBeNull();
    expect(localStorage.getItem('key2')).toBeNull();
  });

  it('should not throw an error if trying to remove a nonexistent key', () => {
    expect(() => service.removeData(['nonexistentKey'])).not.toThrow();
  });
});
